package com.aptsmas.dataservice.controller.ctrl;

import com.aptsmas.dataservice.controller.PoetControllerApi;
import com.aptsmas.dataservice.entity.PoetDetail;
import com.aptsmas.dataservice.service.PoetService;
import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.PoetListVO;
import com.aptsmas.dataservice.vo.PoetVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@RestController
@RequestMapping("/api/v1/poet")
public class PoetController implements PoetControllerApi {
    private final PoetService poetService;

    @Autowired
    public PoetController(PoetService poetService) {
        this.poetService = poetService;
    }

    @Override
    @GetMapping("/poetInfo/{id}")
    public ResponseEntity<?> getPoetInfoById(
            @PathVariable Integer id
    ) {
        log.info("getPoetById - PathVariable id={}", id);

        PoetDetail poet = poetService.findPoetById(id);

        if (poet != null) {
            PoetVO poetVO = new PoetVO();
            BeanUtils.copyProperties(poet, poetVO);

            return ResponseEntity.status(HttpStatus.OK).body(poetVO);
        } else {
            ErrorMsgVO errorMsgVO = new ErrorMsgVO();
            errorMsgVO.setHttpErrCode(HttpStatus.BAD_REQUEST.value())
                    .setErrMsg(String.format("PathVariable id={%s} is out of index.", id));

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMsgVO);
        }

    }

    @Override
    @GetMapping("/poetInfoList")
    public ResponseEntity<?> getPoetListByLocation(
            @RequestParam String locationId
    ) {
        log.info("getPoetListByLocation - RequestParam locationId={}", locationId);

        List<PoetDetail> poetDetailList = poetService.findPoetsByLocationId(locationId);

        if (poetDetailList != null) {
            List<PoetVO> poetVOList = poetDetailList.stream().map(item -> {
                PoetVO poetVO = new PoetVO();
                BeanUtils.copyProperties(item, poetVO);
                return poetVO;
            }).collect(Collectors.toList());

            PoetListVO poetListVO = new PoetListVO();
            poetListVO.setPoetList(poetVOList);

            return ResponseEntity.status(HttpStatus.OK).body(poetListVO);
        } else {
            ErrorMsgVO errorMsgVO = new ErrorMsgVO();
            errorMsgVO.setHttpErrCode(HttpStatus.BAD_REQUEST.value())
                    .setErrMsg(String.format("Query with locationId={%s} Wrong.", locationId));

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMsgVO);
        }
    }
}
