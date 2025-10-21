import { FormData } from './FormDataContext';
import { TipoDenuncia, FocoManipulacao } from '@/types/api';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export class FormValidator {
  static validateStep(stepNumber: number, formData: FormData): ValidationResult {
    if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      switch (stepNumber) {
        case 1:
          return this.validateTipoDenuncia(formData);
        case 2:
          return this.validatePartidaData(formData);
        case 3:
          return this.validateEnvolvidos(formData);
        case 4:
          return this.validateDescricao(formData);
        default:
          return { isValid: true };
      }
    }

    // Esquema de manipulação
    switch (stepNumber) {
      case 1:
        return this.validateTipoDenuncia(formData);
      case 2:
        return this.validateEsquemaInfoBasica(formData);
      case 3:
        return this.validateEsquemaFoco(formData);
      case 4:
        return this.validateEsquemaDetalhes(formData);
      default:
        return { isValid: true };
    }
  }

  static validateTipoDenuncia(formData: FormData): ValidationResult {
    if (!formData.tipoDenuncia) {
      return {
        isValid: false,
        message: 'Por favor, selecione o tipo de denúncia'
      };
    }
    return { isValid: true };
  }

  static validatePartidaData(formData: FormData): ValidationResult {
    if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      if (!formData.torneio) {
        return {
          isValid: false,
          message: 'Por favor, informe o torneio'
        };
      }
      if (!formData.localPartida) {
        return {
          isValid: false,
          message: 'Por favor, informe o local da partida'
        };
      }
      if (!formData.municipio) {
        return {
          isValid: false,
          message: 'Por favor, informe o município'
        };
      }
      if (!formData.uf) {
        return {
          isValid: false,
          message: 'Por favor, selecione uma UF'
        };
      }
    }
    return { isValid: true };
  }

  static validateEsquemaInfoBasica(formData: FormData): ValidationResult {
    if (formData.tipoDenuncia !== TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      return { isValid: true };
    }

    if (!formData.comoSoube) {
      return {
        isValid: false,
        message: 'Por favor, informe como soube do esquema'
      };
    }

    if (!formData.pontualOuDisseminado) {
      return {
        isValid: false,
        message: 'Por favor, selecione se o esquema é pontual ou disseminado'
      };
    }

    if (!formData.frequencia) {
      return {
        isValid: false,
        message: 'Por favor, selecione a frequência do esquema'
      };
    }

    if (!formData.municipio || !formData.municipio.trim()) {
      return {
        isValid: false,
        message: 'Por favor, informe o município'
      };
    }

    if (!formData.uf || !formData.uf.trim()) {
      return {
        isValid: false,
        message: 'Por favor, selecione uma UF'
      };
    }

    return { isValid: true };
  }

  static validateEsquemaFoco(formData: FormData): ValidationResult {
    if (formData.tipoDenuncia !== TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      return { isValid: true };
    }

    if (!formData.focosManipulacao || formData.focosManipulacao.length === 0) {
      return {
        isValid: false,
        message: 'Selecione pelo menos um foco do esquema'
      };
    }

    return { isValid: true };
  }

  static validateEsquemaDetalhes(formData: FormData): ValidationResult {
    if (formData.tipoDenuncia !== TipoDenuncia.ESQUEMA_DE_MANIPULACAO) {
      return { isValid: true };
    }

    const descricaoValidation = this.validateDescricao(formData);
    if (!descricaoValidation.isValid) {
      return descricaoValidation;
    }

    const pessoas = formData.pessoasEnvolvidas || [];
    const focosSelecionados = formData.focosManipulacao || [];
    const partidas = formData.partidasSuspeitas || [];

    const sanitize = (value: string) => value?.trim() || '';

    if (focosSelecionados.includes(FocoManipulacao.JUIZES)) {
      const juizes = pessoas.filter(p => p.funcaoPessoa === 'Juiz');
      if (juizes.length === 0 || juizes.every(p => !sanitize(p.nomePessoa))) {
        return {
          isValid: false,
          message: 'Informe ao menos um juiz envolvido'
        };
      }
    }

    if (focosSelecionados.includes(FocoManipulacao.APOSTADORES)) {
      const apostadores = pessoas.filter(p => p.funcaoPessoa === 'Apostador');
      if (apostadores.length === 0 || apostadores.every(p => !sanitize(p.nomePessoa))) {
        return {
          isValid: false,
          message: 'Informe ao menos um apostador envolvido'
        };
      }
    }

    if (focosSelecionados.includes(FocoManipulacao.ATLETAS_DIRIGENTES_COMISSAO)) {
      const funcoesValidas = ['Atleta', 'Dirigente', 'Comissão Técnica'];
      const pessoasValidas = pessoas.filter(p => funcoesValidas.includes(p.funcaoPessoa));
      if (pessoasValidas.length === 0 || pessoasValidas.every(p => !sanitize(p.nomePessoa))) {
        return {
          isValid: false,
          message: 'Informe ao menos um atleta, dirigente ou membro da comissão técnica envolvido'
        };
      }
    }

    // Partidas suspeitas obrigatórias em todos os focos
    const partidasValidas = partidas.filter(p =>
      sanitize(p.nome) && sanitize(p.data) && sanitize(p.local) && sanitize(p.municipio)
    );
    if (partidasValidas.length === 0) {
      return {
        isValid: false,
        message: 'Informe ao menos uma partida suspeita (nome, data, local e município)'
      };
    }

    return { isValid: true };
  }

  static validateEnvolvidos(formData: FormData): ValidationResult {
    if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      if (formData.pessoasEnvolvidas.length === 0) {
        return {
          isValid: false,
          message: 'Pelo menos uma pessoa deve estar envolvida'
        };
      }
      
      const hasIncompletePerson = formData.pessoasEnvolvidas.some(
        p => !p.nomePessoa.trim() || !p.funcaoPessoa.trim()
      );
      
      if (hasIncompletePerson) {
        return {
          isValid: false,
          message: 'Por favor, preencha todos os campos de pessoas envolvidas'
        };
      }
    }
    return { isValid: true };
  }

  static validateDescricao(formData: FormData): ValidationResult {
    if (!formData.descricao || formData.descricao.trim().length < 10) {
      return {
        isValid: false,
        message: 'A descrição deve ter pelo menos 10 caracteres'
      };
    }
    return { isValid: true };
  }

  static validateForSubmission(formData: FormData): ValidationResult {
    // Validação geral antes do envio
    const descricaoValidation = this.validateDescricao(formData);
    if (!descricaoValidation.isValid) {
      return descricaoValidation;
    }

    if (formData.tipoDenuncia === TipoDenuncia.PARTIDA_ESPECIFICA) {
      const partidaValidation = this.validatePartidaData(formData);
      if (!partidaValidation.isValid) {
        return partidaValidation;
      }

      const envolvidosValidation = this.validateEnvolvidos(formData);
      if (!envolvidosValidation.isValid) {
        return envolvidosValidation;
      }
    } else {
      const infoBasicaValidation = this.validateEsquemaInfoBasica(formData);
      if (!infoBasicaValidation.isValid) {
        return infoBasicaValidation;
      }

      const focoValidation = this.validateEsquemaFoco(formData);
      if (!focoValidation.isValid) {
        return focoValidation;
      }

      const detalhesValidation = this.validateEsquemaDetalhes(formData);
      if (!detalhesValidation.isValid) {
        return detalhesValidation;
      }
    }

    return { isValid: true };
  }
}

export const formatDateToISO = (dateString: string): string => {
  if (!dateString) return '';
  try {
    if (dateString.includes('T') && dateString.endsWith('Z')) {
      return dateString;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Data inválida');
    }
    return date.toISOString();
  } catch (error) {
    console.error('Erro ao converter data:', error);
    return '';
  }
};
