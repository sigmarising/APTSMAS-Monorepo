package com.aptsmas.dataservice.vo.OLAMvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMOutlierProvincesVO", description = "Part of the OLAM VO")
public class OLAMOutlierProvincesVO {
    @Schema(description = "percent of end")
    private Double percent;

    @Schema(description = "the items")
    private List<OLAMVecItemVO> items;
}
