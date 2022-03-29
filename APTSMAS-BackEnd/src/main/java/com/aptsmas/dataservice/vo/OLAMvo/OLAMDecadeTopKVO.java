package com.aptsmas.dataservice.vo.OLAMvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMFreqDecadeVO", description = "Part of OLAM VO")
public class OLAMDecadeTopKVO {
    @Schema(description = "Top K")
    private Integer k;

    @Schema(description = "the items")
    private List<OLAMValItemVO> items;
}
