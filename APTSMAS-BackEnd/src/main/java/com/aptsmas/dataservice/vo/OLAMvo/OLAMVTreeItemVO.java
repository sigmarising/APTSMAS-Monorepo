package com.aptsmas.dataservice.vo.OLAMvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMVTreeItemVO", description = "Part of OLAMVTreeVO")
public class OLAMVTreeItemVO {
    @Schema(description = "select level")
    private String type;

    @Schema(description = "list of result items")
    private List<String> items;
}
