package com.linkedin.kata;

public class Roman {
    static int convert(String romanNumeral) {
        if (romanNumeral.length() == 1) {
            return convertSingleDigit(romanNumeral);
        }
        if(romanNumeral.equals("II")) {
            return 2;
        } else if(romanNumeral.equals("III")) {
            return 3;
        } else {
            return 6;
        }
    }

    private static int convertSingleDigit(String romanNumeral) {
        if(romanNumeral.equals("I")) {
            return 1;
        } else if(romanNumeral.equals("V")){
            return 5;
        } else {
            return 10;
        }
    }
}
