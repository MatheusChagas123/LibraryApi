package com.biblioteca.sistemasDistribuidos.Service;

import com.biblioteca.sistemasDistribuidos.Dto.EmprestimoDto.EmprestimoGetDto;
import com.biblioteca.sistemasDistribuidos.Dto.EmprestimoDto.EmprestimoPostDto;
import com.biblioteca.sistemasDistribuidos.Model.EmprestimoModel;
import com.biblioteca.sistemasDistribuidos.Repository.EmprestimoRepository;
import com.biblioteca.sistemasDistribuidos.Repository.LivroRepository;
import com.biblioteca.sistemasDistribuidos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private LivroRepository livroRepository;

    @Autowired
    private UsuarioService usuarioService;

    // Empréstimo de livro
    public ResponseEntity<?> alugaLivro(EmprestimoPostDto data){
        var livro = livroRepository.findById(data.livroId()).orElseThrow(() ->
                new RuntimeException("Livro com id: '" + data.livroId() + "' não encontrado"));
        var usuario = usuarioRepository.findById(data.usuarioId()).orElseThrow(() ->
                new RuntimeException("Usuario com id: '" + data.usuarioId() + "' não encontrado"));

        if (livro.isEmprestado()){

            throw new RuntimeException("O livro: '" + livro.getTitulo() + "' já está emprestado!");
        }

        if(usuario.getMaxEmprestimos() == 5){

            throw new RuntimeException("O usuário não pode mais alugar livros, número máximo de 5 atingido!");
        }

        var emprestimo = new EmprestimoModel(livro, usuario, data);
        emprestimoRepository.save(emprestimo);

        livro.setEmprestimoAtual(emprestimo);
        livro.setEmprestado(true);
        livro.setQtdEmprestado(livro.getQtdEmprestado() + 1);
        livroRepository.save(livro);

        usuario.getEmprestimos().add(emprestimo);
        usuarioService.verificaStatus(usuario);
        usuario.setMaxEmprestimos(usuario.getMaxEmprestimos() + 1);
        usuarioRepository.save(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(new EmprestimoGetDto(emprestimo));

    }

    // Retorna todos os empréstimos
    public ResponseEntity<?> retornoEmprestimos(Pageable pageable) {

        return ResponseEntity.status(HttpStatus.OK).body(emprestimoRepository.findAll().stream().map(EmprestimoGetDto::new));
    }

    // Devolução do livro
    public ResponseEntity<?> devolucaoDeLivro(Long id){
        var emprestimo = emprestimoRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Emprestimo com id: '" + id + "' não encontrado"));

        var livro = emprestimo.getLivro();
        var usuario = emprestimo.getUsuario();

        livro.setEmprestado(false);
        livro.setEmprestimoAtual(null);
        livroRepository.save(livro);

        usuario.getEmprestimos().removeIf(e -> e.getId().equals(id));
        usuario.setMaxEmprestimos(usuario.getMaxEmprestimos() - 1);
        usuarioService.verificaStatus(usuario);
        usuarioRepository.save(usuario);

        emprestimoRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.OK).body(new EmprestimoGetDto(emprestimo));

    }

}
