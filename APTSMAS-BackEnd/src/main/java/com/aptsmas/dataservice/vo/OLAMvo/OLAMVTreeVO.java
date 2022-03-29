package com.aptsmas.dataservice.vo.OLAMvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMVTreeVO", description = "Part of OLAM VO")
public class OLAMVTreeVO {
    @Schema(description = "property of poet")
    private OLAMVTreeItemVO poet;

    @Schema(description = "property of time")
    private OLAMVTreeItemVO time;

    @Schema(description = "property of location")
    private OLAMVTreeItemVO location;
}
