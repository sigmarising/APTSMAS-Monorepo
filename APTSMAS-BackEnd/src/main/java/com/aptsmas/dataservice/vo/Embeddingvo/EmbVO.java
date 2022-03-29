package com.aptsmas.dataservice.vo.Embeddingvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Data
@Accessors(chain = true)
@Schema(name = "EmbVO", description = "The Emb query result VO")
public class EmbVO {
    @Schema(description = "the trajectories")
    private List<EmbTrajectoriesVO> trajectories;

    @Schema(description = "the in degree of normal")
    private EmbTopKVO normalLocationIn;

    @Schema(description = "the in degree of normal")
    private EmbTopKVO normalCityIn;

    @Schema(description = "the in degree of normal")
    private EmbTopKVO normalProvinceIn;

    @Schema(description = "the in degree of normal")
    private EmbTopKVO normalCountryIn;

    @Schema(description = "the out degree of normal")
    private EmbTopKVO normalLocationOut;

    @Schema(description = "the out degree of normal")
    private EmbTopKVO normalCityOut;

    @Schema(description = "the out degree of normal")
    private EmbTopKVO normalProvinceOut;

    @Schema(description = "the out degree of normal")
    private EmbTopKVO normalCountryOut;

    @Schema(description = "the in degree of abnormal")
    private EmbTopKVO abnormalLocationIn;

    @Schema(description = "the in degree of abnormal")
    private EmbTopKVO abnormalCityIn;

    @Schema(description = "the in degree of abnormal")
    private EmbTopKVO abnormalProvinceIn;

    @Schema(description = "the in degree of abnormal")
    private EmbTopKVO abnormalCountryIn;

    @Schema(description = "the out degree of abnormal")
    private EmbTopKVO abnormalLocationOut;

    @Schema(description = "the out degree of abnormal")
    private EmbTopKVO abnormalCityOut;

    @Schema(description = "the out degree of abnormal")
    private EmbTopKVO abnormalProvinceOut;

    @Schema(description = "the out degree of abnormal")
    private EmbTopKVO abnormalCountryOut;

    public EmbVO() {
        trajectories = new ArrayList<>();

        normalLocationIn = new EmbTopKVO();
        normalCityIn = new EmbTopKVO();
        normalProvinceIn = new EmbTopKVO();
        normalCountryIn = new EmbTopKVO();

        normalLocationOut = new EmbTopKVO();
        normalCityOut = new EmbTopKVO();
        normalProvinceOut = new EmbTopKVO();
        normalCountryOut = new EmbTopKVO();

        abnormalLocationIn = new EmbTopKVO();
        abnormalCityIn = new EmbTopKVO();
        abnormalProvinceIn = new EmbTopKVO();
        abnormalCountryIn = new EmbTopKVO();

        abnormalLocationOut = new EmbTopKVO();
        abnormalCityOut = new EmbTopKVO();
        abnormalProvinceOut = new EmbTopKVO();
        abnormalCountryOut = new EmbTopKVO();
    }
}
