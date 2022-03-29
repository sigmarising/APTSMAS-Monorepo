package com.aptsmas.dataservice.controller.ctrl;

import com.aptsmas.dataservice.controller.EmbeddingControllerApi;
import com.aptsmas.dataservice.service.EmbService;
import com.aptsmas.dataservice.vo.ErrorMsgVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/emb")
public class EmbeddingController implements EmbeddingControllerApi {
    private final EmbService embService;

    @Autowired
    public EmbeddingController(EmbService embService) {
        this.embService = embService;
    }

    @Override
    @GetMapping("/result")
    public ResponseEntity<?> getEmbResultsByParams(
            @RequestParam Integer kernelId,
            @RequestParam Integer algorithmId
    ) {
        log.info("getEmbResultsByParams - Params kernelId = {} algorithmId = {}", kernelId, algorithmId);

        boolean isTypeExist = embService.isTypeIdValid(algorithmId);

        if (isTypeExist) {
            try {
                return ResponseEntity.status(HttpStatus.OK).body(embService.getEmbResult(algorithmId));
            } catch (Exception e) {
                ErrorMsgVO errorMsgVO = new ErrorMsgVO();
                errorMsgVO.setHttpErrCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .setErrMsg(String.format("Internal Error: %s", e));

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMsgVO);
            }
        } else {
            ErrorMsgVO errorMsgVO = new ErrorMsgVO();
            errorMsgVO.setHttpErrCode(HttpStatus.BAD_REQUEST.value())
                    .setErrMsg(String.format(
                                    "Check whether kernelId={%s} algorithmId={%s} are valid",
                                    kernelId,
                                    algorithmId
                            )
                    );

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMsgVO);

        }
    }
}
