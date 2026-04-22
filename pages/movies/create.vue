<template>
  <div class="flex">
    <el-card shadow="never" class="mx-auto w-1/2 min-w-[500px]">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        label-width="100px"
        status-icon
      >
        <el-form-item :label="$t('general.title')" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>

        <el-form-item :label="$t('general.director')" prop="director">
          <el-input v-model="ruleForm.director" />
        </el-form-item>

        <el-form-item :label="$t('general.year')" prop="year">
          <el-input v-model="ruleForm.year" />
        </el-form-item>

        <el-form-item :label="$t('general.plot')" prop="plot">
          <el-input v-model="ruleForm.plot" type="textarea" />
        </el-form-item>

        <el-upload
          ref="upload"
          class="upload-demo"
          action="#"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">{{ $t('general.selectFile') }}</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
              {{ $t('general.fileRestriction') }}
            </div>
          </template>
        </el-upload>

        <el-form-item>
          <el-button type="primary" class="ml-auto" @click="submitForm">
            {{ $t('general.create') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

definePageMeta({
  pageLabel: 'navigation.create'
})

const ruleFormRef = useElFormRef()

const ruleForm = useElFormModel({
  title: 'Hello',
  director: '',
  year: '',
  plot: ''
})

const upload = ref<UploadInstance>()

const rules = useElFormRules({
  title: [useRequiredRule(), useMinLenRule(3), useMaxLenRule(5)],
  director: [useRequiredRule(), useMinLenRule(3)],
  year: [useRequiredRule()],
  plot: [useRequiredRule(), useMaxLenRule(250)]
})

async function submitForm () {
  await ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', valid)
      console.log(upload.value)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  if (!upload.value) return

  upload.value.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value.handleStart(file)
}

</script>
