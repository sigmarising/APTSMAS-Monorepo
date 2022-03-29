package com.aptsmas.dataservice.service.impl;

import com.aptsmas.dataservice.entity.OLAMPostBody.*;
import com.aptsmas.dataservice.entity.PoetLines;
import com.aptsmas.dataservice.entity.PoetTravel;
import com.aptsmas.dataservice.entity.PoetTravelItem;
import com.aptsmas.dataservice.mapper.GeoMapper;
import com.aptsmas.dataservice.mapper.PoetDetailMapper;
import com.aptsmas.dataservice.mapper.PoetLinesMapper;
import com.aptsmas.dataservice.service.OLAMService;
import com.aptsmas.dataservice.vo.OLAMvo.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class OLAMServiceImpl implements OLAMService {
    private final Integer MAX_V_TREE_ITEM_SIZE = 3;
    private final Integer K_VALUE = 20;
    private final Double K_PERCENT = 0.2;

    private final PoetLinesMapper poetLinesMapper;
    private final PoetDetailMapper poetDetailMapper;
    private final GeoMapper geoMapper;

    @Autowired
    public OLAMServiceImpl(PoetLinesMapper poetLinesMapper, PoetDetailMapper poetDetailMapper, GeoMapper geoMapper) {
        this.poetLinesMapper = poetLinesMapper;
        this.poetDetailMapper = poetDetailMapper;
        this.geoMapper = geoMapper;
    }

    private List<PoetTravel> getPoetTravelListByPoetIds(List<Integer> ids) {
        List<PoetTravel> result = new ArrayList<>();

        var poetLinesList = poetLinesMapper.getPoetLinesByPoetIds(ids);
        var poetLinesGroup = poetLinesList.stream().collect(
                Collectors.groupingBy(PoetLines::getPoetId)
        );

        for (var entry : poetLinesGroup.entrySet()) { // each poet
            var poetLinesEntry = entry.getValue();
            var poet = new PoetTravel()
                    .setId(poetLinesEntry.get(0).getPoetId())
                    .setTravel(new ArrayList<>());

            for (var linePoint : poetLinesEntry) { // poet travel
                poet.getTravel().add(
                        new PoetTravelItem()
                                .setYear(linePoint.getVisitYear())
                                .setCountry(linePoint.getCountryId())
                                .setProvince(linePoint.getProvinceId())
                                .setCity(linePoint.getCityId())
                                .setLocation(linePoint.getLocationId())
                );
            }

            result.add(poet);
        }

        return result;
    }

    private OLAMVTreeVO formVTreeVO(OLAMPostBody body) {
        // property poet
        OLAMVTreeItemVO poet = new OLAMVTreeItemVO()
                .setType(body.getPoet().getSelectLevel()).setItems(new ArrayList<>());
//      for (int i = 0; i < MAX_V_TREE_ITEM_SIZE && i < body.getPoet().getSelected().size(); i++)
        for (int i = 0; i < body.getPoet().getSelected().size(); i++)
            if (body.getPoet().getSelectLevel().equals("dynasty"))
                poet.getItems().add(body.getPoet().getSelected().get(i) == 1 ? "唐" : "宋");
            else
                poet.getItems().add(body.getPoet().getSelected().get(i).toString());
//        if (body.getPoet().getSelected().size() > MAX_V_TREE_ITEM_SIZE)
//            poet.getItems().add("等");

        // property time
        OLAMVTreeItemVO time = new OLAMVTreeItemVO()
                .setType(body.getTime().getSelectLevel()).setItems(new ArrayList<>());
//      for (int i = 0; i < MAX_V_TREE_ITEM_SIZE && i < body.getTime().getSelected().size(); i++) {
        for (int i = 0; i < body.getTime().getSelected().size(); i++) {
            var range = body.getTime().getSelected().get(i);
            time.getItems().add(range.getFrom().toString() + "-" + range.getTo().toString());
        }
//        if (body.getTime().getSelected().size() > MAX_V_TREE_ITEM_SIZE)
//            time.getItems().add("等");

        // property location
        OLAMVTreeItemVO geo = new OLAMVTreeItemVO()
                .setType(body.getLocation().getSelectLevel()).setItems(new ArrayList<>());
//        for (int i = 0; i < MAX_V_TREE_ITEM_SIZE && i < body.getLocation().getSelected().size(); i++)
        for (int i = 0; i < body.getLocation().getSelected().size(); i++)
            geo.getItems().add(body.getLocation().getSelected().get(i));
//        if (body.getLocation().getSelected().size() > MAX_V_TREE_ITEM_SIZE)
//            geo.getItems().add("等");

        // result
        return new OLAMVTreeVO().setPoet(poet).setTime(time).setLocation(geo);
    }

    private OLAMPoetsTopKVO formPoetsTOpKVO(List<Map.Entry<Integer, Integer>> list) {
        OLAMPoetsTopKVO result = new OLAMPoetsTopKVO().setK(K_VALUE).setItems(new ArrayList<>());

        for (int i = 0; i < K_VALUE && i < list.size(); i++) {
            var item = list.get(i);
            result.getItems().add(new OLAMValItemVO().setName(item.getKey().toString()).setValue(item.getValue()));
        }

        return result;
    }

    private OLAMLocationsTopKVO formLocationsTopKVO(List<Map.Entry<String, Integer>> list) {
        OLAMLocationsTopKVO result = new OLAMLocationsTopKVO().setK(K_VALUE).setItems(new ArrayList<>());

        for (int i = 0; i < K_VALUE && i < list.size(); i++) {
            var item = list.get(i);
            result.getItems().add(new OLAMValItemVO().setName(item.getKey()).setValue(item.getValue()));
        }

        return result;
    }

    private OLAMProvincesTopKVO formProvincesTopKVO(List<Map.Entry<String, Integer>> list) {
        OLAMProvincesTopKVO result = new OLAMProvincesTopKVO().setK(K_VALUE).setItems(new ArrayList<>());

        for (int i = 0; i < K_VALUE && i < list.size(); i++) {
            var item = list.get(i);
            result.getItems().add(new OLAMValItemVO().setName(item.getKey()).setValue(item.getValue()));
        }

        return result;
    }

    private OLAMYearTopKVO formYearTopKVO(List<Map.Entry<Integer, Integer>> list) {
        OLAMYearTopKVO result = new OLAMYearTopKVO().setK(K_VALUE).setItems(new ArrayList<>());

        for (int i = 0; i < K_VALUE && i < list.size(); i++) {
            var item = list.get(i);
            result.getItems().add(new OLAMValItemVO().setName(item.getKey().toString()).setValue(item.getValue()));
        }

        return result;
    }

    private OLAMDecadeTopKVO formDecadeTopKVO(List<Map.Entry<String, Integer>> list) {
        OLAMDecadeTopKVO result = new OLAMDecadeTopKVO().setK(K_VALUE).setItems(new ArrayList<>());

        for (int i = 0; i < K_VALUE && i < list.size(); i++) {
            var item = list.get(i);
            result.getItems().add(new OLAMValItemVO().setName(item.getKey()).setValue(item.getValue()));
        }

        return result;
    }

    private OLAMCenturyTopKVO formCenturyTopKVO(List<Map.Entry<String, Integer>> list) {
        OLAMCenturyTopKVO result = new OLAMCenturyTopKVO().setK(K_VALUE).setItems(new ArrayList<>());

        for (int i = 0; i < K_VALUE && i < list.size(); i++) {
            var item = list.get(i);
            result.getItems().add(new OLAMValItemVO().setName(item.getKey()).setValue(item.getValue()));
        }

        return result;
    }

    private List<OLAMVecItemVO> formFreqVecInner(List<Map.Entry<String, Integer>> list, boolean isOutlier) {
        List<OLAMVecItemVO> result = new ArrayList<>();

        int K = Double.valueOf(Math.ceil(list.size() * K_PERCENT)).intValue();
        int i = isOutlier ? list.size() - 1 : 0;
        int count = 0;
        while (count < K && count < list.size()) {
            var item = list.get(i);
            String[] geos = item.getKey().split("-");

            result.add(new OLAMVecItemVO().setFrom(geos[0]).setTo(geos[1]).setValue(item.getValue()));

            i = isOutlier ? i - 1 : i + 1;
            count += 1;
        }

        return result;
    }

    private OLAMFreqLocationsVO formFreqLocationsVO(List<Map.Entry<String, Integer>> list) {
        return new OLAMFreqLocationsVO().setPercent(K_PERCENT).setItems(formFreqVecInner(list, false));
    }

    private OLAMFreqProvincesVO formFreqProvinceVO(List<Map.Entry<String, Integer>> list) {
        return new OLAMFreqProvincesVO().setPercent(K_PERCENT).setItems(formFreqVecInner(list, false));
    }

    private OLAMOutlierLocationsVO formOutlierLocationsVO(List<Map.Entry<String, Integer>> list) {
        return new OLAMOutlierLocationsVO().setPercent(K_PERCENT).setItems(formFreqVecInner(list, true));
    }

    private OLAMOutlierProvincesVO formOutlierProvinceVO(List<Map.Entry<String, Integer>> list) {
        return new OLAMOutlierProvincesVO().setPercent(K_PERCENT).setItems(formFreqVecInner(list, true));
    }

    private List<Integer> getSelectPoetIds(OLAMPostBodyPoet bodyPoet) {
        if (bodyPoet.getSelectLevel().equals("dynasty")) {
            boolean useTang = false;
            boolean useSong = false;
            for (var dynastyId : bodyPoet.getSelected())
                if (dynastyId == 1) useTang = true;
                else if (dynastyId == 2) useSong = true;

            List<Integer> result = new ArrayList<>();
            if (useTang) result.addAll(poetDetailMapper.getPoetIdsListByDynasty("唐"));
            if (useSong) result.addAll(poetDetailMapper.getPoetIdsListByDynasty("宋"));
            return result;
        }

        return bodyPoet.getSelected();
    }

    private String getDecade(Integer year) {
        int start = year / 10 * 10;
        int end = start + 9;

        return start + "-" + end;
    }

    private String getCentury(Integer year) {
        int start = year / 100 * 100;
        int end = start + 99;

        return start + "-" + end;
    }

    private List<String> getLocationsValidList(OLAMPostBodyLocation bodyLocation) {
        switch (bodyLocation.getSelectLevel()) {
            case "country":
                return geoMapper.getLocationIdsFromCountryIds(bodyLocation.getSelected());
            case "province":
                return geoMapper.getLocationIdsFromProvinceIds(bodyLocation.getSelected());
            case "city":
                return geoMapper.getLocationIdsFromCityIds(bodyLocation.getSelected());
            default:
                return bodyLocation.getSelected();
        }
    }

    boolean judgeLocationValid(List<String> validList, String id) {
        return validList.contains(id);
    }

    boolean judgeYearValid(OLAMPostBodyTime bodyTime, Integer year) {
        var list = bodyTime.getSelected();
        int l = 0, r = list.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            var item = list.get(mid);

            if (item.getFrom() <= year && year <= item.getTo()) return true;
            else if (year < item.getFrom()) r = mid - 1;
            else if (item.getTo() < year) l = mid + 1;
        }
        return false;
    }

    private <T> List<Map.Entry<T, Integer>> sort2List(Map<T, Integer> map) {
        return map.entrySet().stream().sorted((x, y) -> y.getValue() - x.getValue()).collect(Collectors.toList());
    }

    @Override
    @Cacheable("OLAMServiceOLAMOperation")
    public OLAMVO olamOperation(OLAMPostBody body) {
        // form the select poet ids
        var poetTravelList = getPoetTravelListByPoetIds(getSelectPoetIds(body.getPoet()));

        // some statistics var
        Map<Integer, Integer> statValPoet = new HashMap<>();
        Map<String, Integer> statValLocation = new HashMap<>();
        Map<String, Integer> statValProvince = new HashMap<>();
        Map<String, Integer> statVecLocation = new HashMap<>();
        Map<String, Integer> statVecProvince = new HashMap<>();
        Map<Integer, Integer> statValYear = new HashMap<>();
        Map<String, Integer> statValDecade = new HashMap<>();
        Map<String, Integer> statValCentury = new HashMap<>();

        // iter through
        var locationsValidList = getLocationsValidList(body.getLocation());
        for (var poetTravel : poetTravelList) {
            statValPoet.put(poetTravel.getId(), poetTravel.getTravel().size());

            boolean itemPrevIsValid = false;
            for (int i = 0; i < poetTravel.getTravel().size(); i++) {
                var item = poetTravel.getTravel().get(i);
                var locationId = item.getLocation();
                var provinceId = item.getProvince();
                var year = item.getYear();
                var decade = getDecade(year);
                var century = getCentury(year);

                boolean itemIsValid = judgeLocationValid(locationsValidList, locationId)
                        && judgeYearValid(body.getTime(), year);

                if (itemIsValid) {
                    statValLocation.put(locationId, statValLocation.getOrDefault(locationId, 0) + 1);
                    statValProvince.put(provinceId, statValProvince.getOrDefault(provinceId, 0) + 1);
                    statValYear.put(year, statValYear.getOrDefault(year, 0) + 1);
                    statValDecade.put(decade, statValDecade.getOrDefault(decade, 0) + 1);
                    statValCentury.put(century, statValCentury.getOrDefault(century, 0) + 1);
                }

                if (i > 0 && (itemIsValid || itemPrevIsValid)) {
                    var itemPrev = poetTravel.getTravel().get(i - 1);
                    String vecLocation = itemPrev.getLocation() + "-" + locationId;
                    String vecProvince = itemPrev.getProvince() + "-" + provinceId;

                    statVecLocation.put(vecLocation, statVecLocation.getOrDefault(vecLocation, 0) + 1);
                    statVecProvince.put(vecProvince, statVecProvince.getOrDefault(vecProvince, 0) + 1);
                }

                itemPrevIsValid = itemIsValid;
            }
        }

        // sort statistics
        var sortValPoet = sort2List(statValPoet);
        var sortValLocation = sort2List(statValLocation);
        var sortValProvince = sort2List(statValProvince);
        var sortVecLocation = sort2List(statVecLocation);
        var sortVecProvince = sort2List(statVecProvince);
        var sortValYear = sort2List(statValYear);
        var sortValDecade = sort2List(statValDecade);
        var sortValCentury = sort2List(statValCentury);

        // form the result
        return new OLAMVO()
                .setVTree(formVTreeVO(body))
                .setPoetsTopK(formPoetsTOpKVO(sortValPoet))
                .setLocationsTopK(formLocationsTopKVO(sortValLocation))
                .setProvincesTopK(formProvincesTopKVO(sortValProvince))
                .setFreqLocations(formFreqLocationsVO(sortVecLocation))
                .setFreqProvinces(formFreqProvinceVO(sortVecProvince))
                .setOutlierLocations(formOutlierLocationsVO(sortVecLocation))
                .setOutlierProvinces(formOutlierProvinceVO(sortVecProvince))
                .setYearTopK(formYearTopKVO(sortValYear))
                .setDecadeTopK(formDecadeTopKVO(sortValDecade))
                .setCenturyTopK(formCenturyTopKVO(sortValCentury));
    }

    /**
     * Actually, for the `body`, we only need to sort the time property
     * to asc order
     * for the poet and location property, the order is not important
     *
     * @param body
     */
    @Override
    @Cacheable("OLAMServiceOLAMBodyPreSorted")
    public void olamBodyPreSorted(OLAMPostBody body) {
        var obj = body.getTime();
        obj.setSelected(obj.getSelected().stream()
                .sorted(Comparator.comparingInt(OLAMPostBodyTimeSelectedItem::getFrom))
                .collect(Collectors.toList())
        );
        body.setTime(obj);
    }
}
