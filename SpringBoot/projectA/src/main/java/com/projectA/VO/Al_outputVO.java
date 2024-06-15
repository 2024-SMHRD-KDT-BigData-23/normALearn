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
    private BigDecimal firstTime;
    private int secondTemperature;
    private BigDecimal secondTime;
    private int agingTemperature;
    private BigDecimal agingTime;
    private char learning;
    private int cooling;
    private char myPage;
    private BigDecimal tensileStrengthResult;
    private BigDecimal yieldStrengthResult;
    private BigDecimal hardnessResult;
    private BigDecimal elongationResult;
    private LocalDateTime searchDate;
    private Long inputIdx;
    private String userId;
    // 추가 된것
    private String work;
    private String productName;
}