package lk.restroflow.repository;

import lk.restroflow.model.StaffMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffMemberRepository extends JpaRepository<StaffMember, String> {}
