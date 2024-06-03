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
    private int number;
    // 아래 DB에 없는 값
    private int oldNumber;
    private int newNumber;
}