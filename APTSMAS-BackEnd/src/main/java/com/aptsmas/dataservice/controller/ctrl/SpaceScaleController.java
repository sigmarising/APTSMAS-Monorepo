package com.aptsmas.dataservice.controller.ctrl;

import com.aptsmas.dataservice.controller.SpaceScaleControllerApi;
import com.aptsmas.dataservice.service.SpaceScaleService;
import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.SpaceScaleVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/spaceScale")
public class SpaceScaleController implements SpaceScaleControllerApi {
    private static final List<String> ALLOW_TYPES = new ArrayList<>() {{
        add("edges");
        add("points");
    }};
    private final SpaceScaleService spaceScaleService;

    @Autowired
    public SpaceScaleController(SpaceScaleService spaceScaleService) {
        this.spaceScaleService = spaceScaleService;
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String searchType) {
        log.info("searchSpaceScaleByType - RequestParam searchType={}", searchType);

        if (ALLOW_TYPES.contains(searchType)) {
            SpaceScaleVO spaceScaleVO = spaceScaleService.getContentBySearchType(searchType);

            return ResponseEntity.status(HttpStatus.OK).body(spaceScaleVO);
        } else {
            ErrorMsgVO errorMsgVO = new ErrorMsgVO();
            errorMsgVO.setHttpErrCode(HttpStatus.BAD_REQUEST.value())
                    .setErrMsg(String.format("Query with searchType={%s} Wrong.", searchType));

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMsgVO);
        }
    }
}
