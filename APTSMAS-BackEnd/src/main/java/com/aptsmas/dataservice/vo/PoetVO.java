package com.aptsmas.dataservice.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "PoetVO", description = "The Poet Entity VO")
public class PoetVO {
    @Schema(description = "the id of poet")
    private Integer id;

    @Schema(description = "the name of the Poet")
    private String name;

    @Schema(description = "the dynasty of the poet")
    private String dynasty;

    @Schema(description = "start year of life")
    private Integer lifeStart;

    @Schema(description = "end year of life")
    private Integer lifeEnd;

    @Schema(description = "JSON string of mapConfig")
    private String mapConfig;

    @Schema(description = "JSON string of reference")
    private String reference;

    @Schema(description = "JSON string of agesDetail")
    private String agesDetail;

    @Schema(description = "JSON string of travelDetail")
    private String travelDetail;
}
