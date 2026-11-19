package lk.restroflow.repository;

import lk.restroflow.model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DishRepository extends JpaRepository<Dish, String> {}
