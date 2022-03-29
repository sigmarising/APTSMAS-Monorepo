package com.aptsmas.dataservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "PoetListVo", description = "The poet entities list VO")
public class PoetListVO {
    @Schema(description = "poets list")
    private List<PoetVO> poetList;
}
