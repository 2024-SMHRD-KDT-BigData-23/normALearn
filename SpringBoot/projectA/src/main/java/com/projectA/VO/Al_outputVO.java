package com.projectA.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Al_outputVO {
    private Long outputIdx;
    private BigDecimal al;
    private BigDecimal si;
    private BigDecimal cu;
    private BigDecimal fe;
    private BigDecimal mn;
    private BigDecimal mg;
    private BigDecimal sc;
    private BigDecimal zr;
    private BigDecimal ti;
    private BigDecimal ni;
    private BigDecimal sr;
    private BigDecimal ce;
  
    // 여기까지
    private int firstTemperature;
    private int firstTime;
    private int secondTemperature;
    private int secondTime;
    private int agingTemperature;
    private int agingTime;
    private char learning;
    private int tensileTtrengthResult;
    private int yieldStrengthResult;
    private int hardnessResult;
    private int elongationResult;
    private LocalDateTime searchDate;
    private Long inputIdx;
    private String userId;
    // 추가 된것
    private String work;
}
