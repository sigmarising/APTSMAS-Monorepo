package com.aptsmas.dataservice.vo.OLAMvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMValItemVO", description = "The value item of OLAM VO")
public class OLAMValItemVO {
    @Schema(description = "the name of this item")
    private String name;

    @Schema(description = "the value of this item")
    private Integer value;
}
