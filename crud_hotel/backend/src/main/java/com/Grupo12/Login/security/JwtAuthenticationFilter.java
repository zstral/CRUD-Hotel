package com.Grupo12.Login.security;
 
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UtilJwt jwtUtil;

    public JwtAuthenticationFilter(UtilJwt jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
    HttpServletResponse response,
    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // --- NUEVO: ignorar rutas públicas (login y register) ---
        String path = request.getServletPath();
        if (path.equals("/auth/login") || path.equals("/auth/register")) {
            filterChain.doFilter(request, response);
            return; // No validar token para estas rutas
        }
        // ----------------------------------------------------------

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String usuario = jwtUtil.extractUsername(token);
                String rol = jwtUtil.extractRol(token);

                // Spring espera rol
                List<GrantedAuthority> autoridad = List.of(new SimpleGrantedAuthority(rol));
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(usuario, null, autoridad);

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Usuario autenticado: " + usuario + " con rol: " + rol);

            } catch (Exception e) {
                System.out.println("Token inválido: " + e.getMessage());
                
                // --- NUEVO: si el token es inválido, responde con 401 ---
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return; // Salir del filtro
                // ----------------------------------------------------------
            }
        } else {
            // --- NUEVO: si no hay token en rutas protegidas, 401 ---
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
            // ----------------------------------------------------------
        }

        filterChain.doFilter(request, response);
    }
}
