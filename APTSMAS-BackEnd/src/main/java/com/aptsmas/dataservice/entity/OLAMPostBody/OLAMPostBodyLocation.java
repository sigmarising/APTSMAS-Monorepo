package com.aptsmas.dataservice.entity.OLAMPostBody;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMPostBodyLocation", description = "Part of OLAMPostBody")
public class OLAMPostBodyLocation {
    @Schema(description = "value of `country` or `province` or `city` or `location`")
    private String selectLevel;

    @Schema(description = "list of the geo ids")
    private List<String> selected;
}
