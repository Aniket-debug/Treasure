from django.db import models


class Puzzle(models.Model):
    puzzle_name = models.CharField(max_length=50)
    puzzle_answer = models.CharField(max_length=50)

    def __str__(self):
        return self.puzzle_name


class Clue (models.Model):
    puzzle = models.ForeignKey(
        Puzzle, on_delete=models.CASCADE, related_name='clues')
    clue_text = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.clue_text


class Question(models.Model):
    puzzle = models.OneToOneField(
        Puzzle, on_delete=models.Case, related_name="question")
    questionText = models.CharField(max_length=256)
    answerText = models.CharField(max_length=100)

# Beginning holds the hidden treasure, Clue
# The harder step is to
# It's never late to
# Clue 4
# Clue 5
# You have to guess first wor, then second and so forth, you will reach the answer
# Answer -> Start
