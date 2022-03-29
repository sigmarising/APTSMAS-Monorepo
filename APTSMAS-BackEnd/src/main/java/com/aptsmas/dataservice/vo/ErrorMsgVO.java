package com.aptsmas.dataservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "ErrorMsgVO", description = "The Error MsgVO")
public class ErrorMsgVO {
    @Schema(description = "HTTP Err Code")
    private Integer httpErrCode;

    @Schema(description = "Err Msg")
    private String errMsg;
}
