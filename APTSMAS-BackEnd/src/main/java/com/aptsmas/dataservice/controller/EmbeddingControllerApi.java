package com.aptsmas.dataservice.controller;

import com.aptsmas.dataservice.vo.Embeddingvo.EmbVO;
import com.aptsmas.dataservice.vo.ErrorMsgVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "EmbeddingControllerApi", description = "the Embedding related Operations")
public interface EmbeddingControllerApi {
    @Operation(summary = "getEmbResultsByParams", description = "get the embedding result")
    @ApiResponse(
            responseCode = "200",
            description = "the emb results",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = EmbVO.class)
            )
    )
    @ApiResponse(
            responseCode = "400",
            description = "bad request",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ErrorMsgVO.class)
            )
    )
    @ApiResponse(
            responseCode = "500",
            description = "internal server error",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ErrorMsgVO.class)
            )
    )
    ResponseEntity<?> getEmbResultsByParams(
            @Parameter(description = "the id of the emb kernel") Integer kernelId,
            @Parameter(description = "the id of the algorithm") Integer algorithmId
    );
}
