package com.aptsmas.dataservice.controller;

import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.SpaceScaleVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "SpaceScaleControllerApi", description = "the Space Scale related Options")
public interface SpaceScaleControllerApi {
    @Operation(summary = "SpaceScale Search", description = "Do the SpaceScale Search and get the result")
    @ApiResponse(
            responseCode = "200",
            description = "SpaceScale Search Results",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = SpaceScaleVO.class)
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
    ResponseEntity<?> search(
            @Parameter(description = "Search Type") String searchType
    );
}
