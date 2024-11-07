<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {onMounted, ref} from "vue";
import { getCards } from "@/lib/getCards.js";

const cards = ref([])

const fetchCards = async () => {
  cards.value = await getCards();
}

onMounted(() => {
  fetchCards()
})
</script>

<template>
  <div class="mx-5">
    <Card class="mt-5" v-for="card in cards" :key="card.id">
      <CardHeader>
        <CardTitle>{{card.title}}</CardTitle>
        <CardDescription>{{card.description}}</CardDescription>
      </CardHeader>
      <CardContent>
        {{card.content}}
      </CardContent>
      <CardFooter>
        {{card.footer}}
      </CardFooter>
    </Card>
  </div>
</template>
