package com.aptsmas.dataservice.vo.Embeddingvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "EmbVOValItem", description = "The value item of Emb VO")
public class EmbVOValItem {
    @Schema(description = "the name of this item")
    private String name;

    @Schema(description = "the value of this item")
    private Integer value;
}
