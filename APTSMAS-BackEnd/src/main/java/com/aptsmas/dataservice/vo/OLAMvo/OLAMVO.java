package com.aptsmas.dataservice.vo.OLAMvo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@Schema(name = "OLAMVO", description = "The OLAM Post Result")
public class OLAMVO {
    @Schema(description = "result for tree view")
    private OLAMVTreeVO vTree;

    @Schema(description = "result for poets top K")
    private OLAMPoetsTopKVO poetsTopK;

    @Schema(description = "result for locations top K")
    private OLAMLocationsTopKVO locationsTopK;

    @Schema(description = "result for provinces top K")
    private OLAMProvincesTopKVO provincesTopK;

    @Schema(description = "result for graph of locations freq")
    private OLAMFreqLocationsVO freqLocations;

    @Schema(description = "result for graph of provinces freq")
    private OLAMFreqProvincesVO freqProvinces;

    @Schema(description = "result for graph of locations outlier")
    private OLAMOutlierLocationsVO outlierLocations;

    @Schema(description = "result for graph of provinces outlier")
    private OLAMOutlierProvincesVO outlierProvinces;

    @Schema(description = "result for year top K")
    private OLAMYearTopKVO yearTopK;

    @Schema(description = "result for decade top K")
    private OLAMDecadeTopKVO decadeTopK;

    @Schema(description = "result for century top K")
    private  OLAMCenturyTopKVO centuryTopK;
}
