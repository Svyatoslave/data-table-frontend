<template>
  <div class="dafm">
    <div class="dafm__content">
      <ETypography class="dafm__text" variant="body2">ID:</ETypography>
      <ETypography class="dafm__text" variant="body2"> 0005457 </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Тип процедуры:
      </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Предоставление права пользования недрами
      </ETypography>
    </div>
    <ETypography variant="title2" class="dafm__subtitle">
      Сведения о заявителе:
    </ETypography>
    <div class="dafm__content">
      <ETypography class="dafm__text" variant="body2"> Заявитель: </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Общество с ограниченной ответственностью «Геомаркет»
      </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Организационно правовая форма:
      </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Общество с ограниченной ответственностью
      </ETypography>
      <ETypography class="dafm__text" variant="body2"> ОГРН: </ETypography>
      <ETypography class="dafm__text" variant="body2">
        1053600591197
      </ETypography>
      <ETypography class="dafm__text" variant="body2"> ИНН: </ETypography>
      <ETypography class="dafm__text" variant="body2"> 3664069397 </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Вид полезного ископаемого:
      </ETypography>
      <ETypography class="dafm__text" variant="body2">нефть</ETypography>
      <ETypography class="dafm__text" variant="body2">
        Субьект РФ:
      </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Астраханская область
      </ETypography>
      <ETypography class="dafm__text" variant="body2">Дата, время:</ETypography>
      <ETypography class="dafm__text" variant="body2">
        20.04.22 10:30
      </ETypography>
      <ETypography class="dafm__text" variant="body2">
        Комплект документов:
      </ETypography>
      <FileLink
        reference="https://www.figma.com/file/EyJzN50eJkdjDFHIO0u8BW/%D0%A0%D0%BE%D1%81%D0%BD%D0%B5%D0%B4%D1%80%D0%B0-(devs)?node-id=303%3A12479"
      >
        Название файла.pdf
      </FileLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ETypography } from "@/shared/components/data-display";
import { FileLink } from "@/shared/components/navigation";
</script>

<style scoped>
.dafm {
  display: grid;
  grid-row-gap: 20px;
}
.dafm__content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 10px;
}
.dafm__subtitle {
  color: var(--black-color);
  margin-top: 20px;
}
.dafm__text {
  color: var(--dark-blue-color);
}
</style>
