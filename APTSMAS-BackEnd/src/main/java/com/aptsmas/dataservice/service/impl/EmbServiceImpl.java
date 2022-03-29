package com.aptsmas.dataservice.service.impl;

import com.aptsmas.dataservice.entity.PoetDetail;
import com.aptsmas.dataservice.entity.PoetLines;
import com.aptsmas.dataservice.entity.TrajectoryPoint;
import com.aptsmas.dataservice.mapper.EmbMapper;
import com.aptsmas.dataservice.mapper.PoetDetailMapper;
import com.aptsmas.dataservice.mapper.PoetLinesMapper;
import com.aptsmas.dataservice.service.EmbService;
import com.aptsmas.dataservice.vo.Embeddingvo.EmbTopKVO;
import com.aptsmas.dataservice.vo.Embeddingvo.EmbTrajectoriesVO;
import com.aptsmas.dataservice.vo.Embeddingvo.EmbVO;
import com.aptsmas.dataservice.vo.Embeddingvo.EmbVOValItem;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class EmbServiceImpl implements EmbService {
    private final Integer K_VALUE = 20;

    private final PoetLinesMapper poetLinesMapper;
    private final EmbMapper embMapper;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    public EmbServiceImpl(PoetLinesMapper poetLinesMapper, EmbMapper embMapper) {
        this.poetLinesMapper = poetLinesMapper;
        this.embMapper = embMapper;
    }

    private void addDegree(
            PoetLines item,
            HashMap<String, Integer> lo,
            HashMap<String, Integer> ci,
            HashMap<String, Integer> pr,
            HashMap<String, Integer> co
    ) {
        String loId = item.getLocationId();
        String ciId = item.getCityId();
        String prId = item.getProvinceId();
        String coId = item.getCountryId();

        lo.put(loId, lo.getOrDefault(loId, 0) + 1);
        ci.put(ciId, ci.getOrDefault(ciId, 0) + 1);
        pr.put(prId, pr.getOrDefault(prId, 0) + 1);
        co.put(coId, co.getOrDefault(coId, 0) + 1);
    }

    private List<Map.Entry<String, Integer>> sort2List(Map<String, Integer> map) {
        return map.entrySet().stream().sorted((x, y) -> y.getValue() - x.getValue()).collect(Collectors.toList());
    }

    private void formTopKDegree(Map<String, Integer> map, EmbTopKVO target) {
        List<EmbVOValItem> items = new ArrayList<>();

        var arr = map.entrySet().stream()
                .sorted((x, y) -> y.getValue() - x.getValue()).collect(Collectors.toList());
        for (int i = 0; i < K_VALUE && i < arr.size(); i++) {
            var item = arr.get(i);
            items.add(new EmbVOValItem().setName(item.getKey()).setValue(item.getValue()));
        }

        target.setK(K_VALUE);
        target.setItems(items);
    }

    private void getDegreesAndTrajectoryOfLines(
            boolean isNormal,
            List<Integer> poetIds,
            List<EmbTrajectoriesVO> line,
            EmbTopKVO locationIn, EmbTopKVO locationOut,
            EmbTopKVO cityIn, EmbTopKVO cityOut,
            EmbTopKVO provinceIn, EmbTopKVO provinceOut,
            EmbTopKVO countryIn, EmbTopKVO countryOut
    ) throws JsonProcessingException {
        var inLo = new HashMap<String, Integer>();
        var inCi = new HashMap<String, Integer>();
        var inPr = new HashMap<String, Integer>();
        var inCo = new HashMap<String, Integer>();
        var outLo = new HashMap<String, Integer>();
        var outCi = new HashMap<String, Integer>();
        var outPr = new HashMap<String, Integer>();
        var outCo = new HashMap<String, Integer>();

        if (poetIds.size() > 0) {
            var poetLinesList = poetLinesMapper.getPoetLinesByPoetIds(poetIds);
            var poetLinesGroup = poetLinesList.stream().collect(
                    Collectors.groupingBy(PoetLines::getPoetId)
            );

            for (var entry : poetLinesGroup.entrySet()) { // each poet

                var trajectory = new ArrayList<TrajectoryPoint>(); // used to form the trajectory
                var poetTrajectory = entry.getValue(); // a poet's trajectory details

                for (int i = 0; i < poetTrajectory.size(); i++) { // each trajectory point
                    var point = poetTrajectory.get(i);

                    // form trajectory
                    trajectory.add(new TrajectoryPoint().setLat(point.getLat()).setLng(point.getLng()));

                    // form degree
                    if (i == 0) { // only add out-degree
                        addDegree(point, outLo, outCi, outPr, outCo);
                    } else if (i == poetTrajectory.size() - 1) { // only add in-degree
                        addDegree(point, inLo, inCi, inPr, inCo);
                    } else { // add both
                        addDegree(point, outLo, outCi, outPr, outCo);
                        addDegree(point, inLo, inCi, inPr, inCo);
                    }
                }

                line.add(new EmbTrajectoriesVO()
                        .setId(entry.getValue().get(0).getPoetId())
                        .setNormal(isNormal)
                        .setTrajectory(objectMapper.writeValueAsString(trajectory))
                );
            }
        }

        formTopKDegree(inLo, locationIn);
        formTopKDegree(inCi, cityIn);
        formTopKDegree(inPr, provinceIn);
        formTopKDegree(inCo, countryIn);
        formTopKDegree(outLo, locationOut);
        formTopKDegree(outCi, cityOut);
        formTopKDegree(outPr, provinceOut);
        formTopKDegree(outCo, countryOut);
    }

    @Override
    @Cacheable("EmbServiceGetEmbResult")
    public EmbVO getEmbResult(Integer typeId) throws JsonProcessingException {
        EmbVO embVO = new EmbVO();

        List<Integer> normalPoets = embMapper.getNormalPoetIdsById(typeId);
        List<Integer> abnormalPoets = embMapper.getAbnormalPoetIdsById(typeId);

        List<EmbTrajectoriesVO> normalTRAJS = new ArrayList<>();
        List<EmbTrajectoriesVO> abnormalTRAJS = new ArrayList<>();
        List<EmbTrajectoriesVO> allTRAJS = new ArrayList<>();

        getDegreesAndTrajectoryOfLines(
                true,
                normalPoets,
                normalTRAJS,
                embVO.getNormalLocationIn(),
                embVO.getNormalLocationOut(),
                embVO.getNormalCityIn(),
                embVO.getNormalCityOut(),
                embVO.getNormalProvinceIn(),
                embVO.getNormalProvinceOut(),
                embVO.getNormalCountryIn(),
                embVO.getNormalCountryOut()
        );
        getDegreesAndTrajectoryOfLines(
                false,
                abnormalPoets,
                abnormalTRAJS,
                embVO.getAbnormalLocationIn(),
                embVO.getAbnormalLocationOut(),
                embVO.getAbnormalCityIn(),
                embVO.getAbnormalCityOut(),
                embVO.getAbnormalProvinceIn(),
                embVO.getAbnormalProvinceOut(),
                embVO.getAbnormalCountryIn(),
                embVO.getAbnormalCountryOut()
        );
        allTRAJS.addAll(normalTRAJS);
        allTRAJS.addAll(abnormalTRAJS);
        allTRAJS.sort(Comparator.comparingInt(EmbTrajectoriesVO::getId));
        embVO.setTrajectories(allTRAJS);

        log.info("EmbService - form EmbVO = {}", embVO);
        return embVO;
    }

    @Override
    @Cacheable("EmbServiceIsTypeIdValid")
    public boolean isTypeIdValid(Integer typeId) {
        return embMapper.getTypeNameById(typeId) != null;
    }
}
