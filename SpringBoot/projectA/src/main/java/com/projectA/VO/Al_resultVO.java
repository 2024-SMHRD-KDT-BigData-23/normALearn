package com.projectA.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Al_resultVO {
    private Long resultIdx;
    private String userId;
    private Long outputIdx;
    private String nickname;
    private char favorite;
    private char myPage;  
    private int number;
    // 아래부터 DB에 없는 값
    private int oldNumber;
    private int newNumber;
    private int tensileStrengthResult;
    private int yieldStrengthResult;
    private int hardnessResult;
    private int elongationResult;
    // 작업 식별자
    private String work;
}