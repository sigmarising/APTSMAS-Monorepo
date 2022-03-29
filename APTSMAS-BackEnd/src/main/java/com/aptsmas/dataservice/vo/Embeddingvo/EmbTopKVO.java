package com.aptsmas.dataservice.vo.Embeddingvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "EmbTopKVO", description = "The TopK Emb ValItem")
public class EmbTopKVO {
    @Schema(description = "Top K")
    private Integer k;

    @Schema(description = "the items")
    private List<EmbVOValItem> items;
}
