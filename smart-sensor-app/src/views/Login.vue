<template>
  <v-container fill-height>
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-12">
          <v-toolbar color="primary">
            <v-toolbar-title class="white--text">
              {{ $t('app.login.name') }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                prepend-icon="person"
                name="email"
                type="email"
                autocomplete="email"
                :error-messages="emailErrors"
                :label="$t('app.login.email')"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              />
              <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                prepend-icon="lock"
                name="password"
                type="password"
                autocomplete="password"
                :label="$t('app.login.password')"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :disabled="$v.$invalid"
              @click="submit"
            >
              {{ $t('app.login.btn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { required, email, minLength } from "vuelidate/lib/validators";

  const PASSWORD_MIN_LENGTH = 5;

  export default {
    name: "Login",
    validations: {
      email: { required, email },
      password: { required, minLength: minLength(PASSWORD_MIN_LENGTH) }
    },
    data: () => ({
      email: "",
      password: ""
    }),
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.required &&
          errors.push(this.$t("validations.emailRequired"));
        !this.$v.email.email && errors.push(this.$t("validations.emailValid"));
        return errors;
      },
      passwordErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.required &&
          errors.push(this.$t("validations.passwordRequired"));
        !this.$v.password.minLength &&
          errors.push(this.$t("validations.passwordMinLength", [PASSWORD_MIN_LENGTH]));
        return errors;
      }
    },
    methods: {
      submit() {
        if (!this.$v.$invalid) {
          this.$store.dispatch("User/login", {
            email: this.email,
            password: this.password
          });
        }
      }
    }
  };
</script>

<style scoped>
</style>