package com.example.kr.repo;

import com.example.kr.models.postModel;
import org.springframework.data.repository.CrudRepository;

public interface postRepository extends CrudRepository<postModel, Long> {
}
