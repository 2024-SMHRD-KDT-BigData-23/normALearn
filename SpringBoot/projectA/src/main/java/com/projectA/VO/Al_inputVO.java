package com.projectA.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Al_inputVO {
    private Long inputIdx;
    private int tensileStrength;
    private int yieldStrength;
    private int hardness;
    private int elongation;
    private char firstSolution;
    private char secondSolution;
    private char aging;
    private String userId;
}
