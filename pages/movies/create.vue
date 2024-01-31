<template>
  <div class="flex justify-center">
    <el-card class="max-w-[500px]">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        label-width="100px"
        status-icon
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>

        <el-form-item label="Director" prop="director">
          <el-input v-model="ruleForm.director" />
        </el-form-item>

        <el-form-item label="Year" prop="year">
          <el-input v-model="ruleForm.year" />
        </el-form-item>

        <el-form-item label="Plot" prop="plot">
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
            <el-button type="primary">Select file</el-button>
          </template>
          <template #tip>
            <div class="el-upload__tip text-red">
              limit 1 file, new file will cover the old file
            </div>
          </template>
        </el-upload>

        <el-form-item>
          <el-button type="primary" class="ml-auto" @click="submitForm">
            Create
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
      console.log('submit!', fields)
      console.log(upload.value)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

</script>
