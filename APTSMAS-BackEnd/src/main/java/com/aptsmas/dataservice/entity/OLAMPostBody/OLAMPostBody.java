package com.aptsmas.dataservice.entity.OLAMPostBody;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors
@Schema(name = "OLAMPostBody", description = "the json body of OLAMPost")
public class OLAMPostBody {
    @Schema(description = "property poet")
    private OLAMPostBodyPoet poet;

    @Schema(description = "property time")
    private OLAMPostBodyTime time;

    @Schema(description = "property location")
    private OLAMPostBodyLocation location;
}
