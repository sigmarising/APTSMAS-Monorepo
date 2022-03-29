package com.aptsmas.dataservice.entity.OLAMPostBody;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMPostBodyTimeSelectedItem", description = "Part of OLAMPostBody")
public class OLAMPostBodyTimeSelectedItem {
    @Schema(description = "range of years from XXX")
    private Integer from;

    @Schema(description = "range of years to XXX")
    private Integer to;
}
