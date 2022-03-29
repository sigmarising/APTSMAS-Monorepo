package com.aptsmas.dataservice.entity.OLAMPostBody;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMPostBodyTime", description = "Part of OLAMPostBody")
public class OLAMPostBodyTime {
    @Schema(description = "value of `year` or `decade` or `century`")
    private String selectLevel;

    @Schema(description = "list of the slices of selected")
    private List<OLAMPostBodyTimeSelectedItem> selected;
}
