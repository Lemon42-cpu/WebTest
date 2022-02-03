package com.example.kr.controllers;

import com.example.kr.models.postModel;
import com.example.kr.repo.postRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {
    @Autowired
    private postRepository postRepository;
    @GetMapping("/characters/student/profile/index")
    public String greeting(Model model) {
        Iterable<postModel> posts = postRepository.findAll();
        model.addAttribute("posts", posts);
        return "/characters/student/profile/index";
    }

    @GetMapping("/")
    public String greetingHome(Model model) {
        Iterable<postModel> posts = postRepository.findAll();
        model.addAttribute("posts", posts);
        return "index";
    }

    @GetMapping("/characters/information/index")
    public String greetingInfo(Model model) {
        Iterable<postModel> posts = postRepository.findAll();
        model.addAttribute("posts", posts);
        return "/characters/information/index";
    }
}
