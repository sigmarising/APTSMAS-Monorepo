package com.aptsmas.dataservice.entity.OLAMPostBody;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMPostBodyPoet", description = "Part of OLAMPostBody")
public class OLAMPostBodyPoet {
    @Schema(description = "value of `poet` or `dynasty`")
    private String selectLevel;

    @Schema(description = "Poet, store the poetIds List; Dynasty, `1` for tang and `2` for song")
    private List<Integer> selected;
}
