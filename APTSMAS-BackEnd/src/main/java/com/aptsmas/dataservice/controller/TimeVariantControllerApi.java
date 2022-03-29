package com.aptsmas.dataservice.controller;

import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.TimeVariantVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "TimeVariantController", description = "the TimeVariant related Operations")
public interface TimeVariantControllerApi {
    @Operation(summary = "TimeVariant Search", description = "Do the TimeVariant Search and get the result")
    @ApiResponse(
            responseCode = "200",
            description = "TimeVariant Search results",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = TimeVariantVO.class)
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
    ResponseEntity<?> search(
            @Parameter(description = "Search Type") String searchType
    );
}
