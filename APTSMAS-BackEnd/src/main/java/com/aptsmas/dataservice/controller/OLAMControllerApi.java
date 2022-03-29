package com.aptsmas.dataservice.controller;

import com.aptsmas.dataservice.entity.OLAMPostBody.OLAMPostBody;
import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.OLAMvo.OLAMVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "OLAMController", description = "the OLAM related Operations")
public interface OLAMControllerApi {
    @Operation(summary = "OLAMOperation", description = "Do the OLAM Operation and get the result")
    @ApiResponse(
            responseCode = "200",
            description = "OLAM results",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = OLAMVO.class)
            )
    )
    @ApiResponse(
            responseCode = "500",
            description = "INTERNAL_SERVER_ERROR",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ErrorMsgVO.class)
            )
    )
    ResponseEntity<?> OLAMOperation(
            @Parameter(schema = @Schema(implementation = OLAMPostBody.class), description = "OLAMPostBody")
                    OLAMPostBody body
    );
}
