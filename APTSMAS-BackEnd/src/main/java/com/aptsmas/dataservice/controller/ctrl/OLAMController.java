package com.aptsmas.dataservice.controller.ctrl;

import com.aptsmas.dataservice.controller.OLAMControllerApi;
import com.aptsmas.dataservice.entity.OLAMPostBody.OLAMPostBody;
import com.aptsmas.dataservice.service.OLAMService;
import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.OLAMvo.OLAMVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/olam")
public class OLAMController implements OLAMControllerApi {

    private final OLAMService olamService;

    @Autowired
    public OLAMController(OLAMService olamService) {
        this.olamService = olamService;
    }

    @Override
    @PostMapping("/search")
    public ResponseEntity<?> OLAMOperation(
            @RequestBody OLAMPostBody body
    ) {
        log.info("olam operation body={}", body);

        try {
            olamService.olamBodyPreSorted(body);
            OLAMVO olamvo = olamService.olamOperation(body);
            return ResponseEntity.status(HttpStatus.OK).body(olamvo);
        } catch (Exception e) {
            log.error("Error when do olam: {}", e.toString());
            ErrorMsgVO errorMsgVO = new ErrorMsgVO()
                    .setHttpErrCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                    .setErrMsg(String.format("OLAM Wrong: {%s}", e));

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMsgVO);
        }
    }
}
