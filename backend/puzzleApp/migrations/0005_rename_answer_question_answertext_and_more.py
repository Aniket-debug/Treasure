# Generated by Django 4.2.1 on 2023-05-08 05:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("puzzleApp", "0004_alter_question_puzzle"),
    ]

    operations = [
        migrations.RenameField(
            model_name="question",
            old_name="answer",
            new_name="answerText",
        ),
        migrations.RenameField(
            model_name="question",
            old_name="question",
            new_name="questionText",
        ),
    ]