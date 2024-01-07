package com.example.backend.configuration;

import com.example.backend.entity.Users;
import com.example.backend.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.StrictHttpFirewall;

import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder  (){
        return new BCryptPasswordEncoder();

    }

    @Bean
    public AuthenticationManager authenticationManager(UserService userService, PasswordEncoder passwordEncoder) {
        return authentication -> {
            String username = authentication.getName();
            String password = authentication.getCredentials().toString();

            // Load user from your UserService
            Users user = userService.loadUserByUsername(username);

            // Implement your custom authentication logic
            if (user != null && passwordEncoder.matches(password, user.getPassword())) {
                // Authentication success
                List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(user.getRoles());
                return new UsernamePasswordAuthenticationToken(user, null, authorities);
            } else {
                // Authentication failed
                // You might want to throw an exception or return an Authentication object indicating failure
                throw new BadCredentialsException("Authentication failed for user: " + username);
            }
        };
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf->csrf.disable())
                .authorizeHttpRequests(auth-> {
                    auth.requestMatchers("/api/v1/authentication/**").permitAll();
                    auth.anyRequest().authenticated();
                })
                .httpBasic(withDefaults())
                .build();

    }
    @Bean
    public StrictHttpFirewall httpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedSlash(true); // Allow encoded slashes in URLs
        return firewall;
    }

}
