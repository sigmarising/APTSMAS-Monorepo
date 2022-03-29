package com.aptsmas.dataservice.controller;

import com.aptsmas.dataservice.vo.ErrorMsgVO;
import com.aptsmas.dataservice.vo.PoetListVO;
import com.aptsmas.dataservice.vo.PoetVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;


@Tag(name = "PoetController", description = "the Poet Related Operations")
public interface PoetControllerApi {
    @Operation(summary = "getPoetInfoById", description = "get the poet information by id")
    @ApiResponse(
            responseCode = "200",
            description = "poet detail information",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = PoetVO.class)
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
    ResponseEntity<?> getPoetInfoById(
            @Parameter(description = "the Id of the poet") Integer id
    );

    @Operation(summary = "getPoetsInfoByLocation", description = "get the poet info list by the visited location")
    @ApiResponse(
            responseCode = "200",
            description = "poets' detail information list",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = PoetListVO.class)
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
    ResponseEntity<?> getPoetListByLocation(
            @Parameter(description = "the query location id") String locationId
    );
}
