package com.aptsmas.dataservice.vo.Embeddingvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "EmbTrajectories", description = "Part of EmbVO")
public class EmbTrajectoriesVO {
    @Schema(description = "the id of this poet")
    private Integer id;

    @Schema(description = "whether the trajectory normal or not")
    private boolean isNormal;

    @Schema(description = "the trajectory string of this poet")
    private String trajectory;
}
