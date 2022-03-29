package com.aptsmas.dataservice.controller.ctrl;

import com.aptsmas.dataservice.controller.TimeVariantControllerApi;
import com.aptsmas.dataservice.entity.TimeVariantItem;
import com.aptsmas.dataservice.service.TimeVariantService;
import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.TimeVariantVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
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
@RequestMapping("/api/v1/timeVariant")
public class TimeVariantController implements TimeVariantControllerApi {
    private static final List<String> ALLOW_TYPES = new ArrayList<>() {{
        add("poetTravel");
        add("locationTravel");
        add("cityTravel");
        add("provinceTravel");
        add("yearTravel");
        add("decadeTravel");
        add("centuryTravel");
        add("routeLocationTravel");
        add("routeCityTravel");
        add("routeProvinceTravel");
    }};
    private final TimeVariantService timeVariantService;

    @Autowired
    public TimeVariantController(TimeVariantService timeVariantService) {
        this.timeVariantService = timeVariantService;
    }

    @Override
    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String searchType) {
        log.info("searchTimeVariantByType - RequestParam searchType={}", searchType);

        if (ALLOW_TYPES.contains(searchType)) {
            TimeVariantVO timeVariantItem = timeVariantService.getContentBySearchType(searchType);

            return ResponseEntity.status(HttpStatus.OK).body(timeVariantItem);
        } else {
            ErrorMsgVO errorMsgVO = new ErrorMsgVO();
            errorMsgVO.setHttpErrCode(HttpStatus.BAD_REQUEST.value())
                    .setErrMsg(String.format("Query with searchType={%s} Wrong.", searchType));

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMsgVO);
        }
    }
}
