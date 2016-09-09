package com.aaron.test.tjar;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by TT-Aaren_Lee on 2016/9/9.
 */
public class Zhegnzhe {

   /** /other-accessories-52/p-da84b.html
    *  截取 /p- 和.html之间的 sku
    *  截取 - 和 /p- 之间的 CategoryID
    */



    public static void main(String[] args) {
        String url = "/other-accessories-52/p-da84b.html.html";
        String regex = "(-)([^-]*)(/p-)([^(.html)]*)(.html)";
        Pattern p = Pattern.compile(regex);
        Matcher matcher = p.matcher(url);
        if (matcher.find()){
            System.out.println(matcher.group());
            String group = matcher.group();

        };
    }


}
