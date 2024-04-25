
function endGame() {
    if (player1Score === 5) {
        fetch(updateScoreUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'winner_uid': userId
            })
        }).then(response => {
            if (response.ok) {
                console.log('Score updated successfully!');
                setTimeout(() => {
                    window.location.href = gamepageUrl;
                }, 2000);
            } else {
                console.error('Failed to update score!');
            }
        }).catch(error => {
            console.error('Error updating score:', error);
        });

        drawText(username + " wins !", 350, 250, 'red');
    } else {
        fetch(updateLoseUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'winner_uid': '0'
            })
        }).then(response => {
            if (response.ok) {
                console.log('Score updated successfully!');
                setTimeout(() => {
                    window.location.href = gamepageUrl;
                }, 2000);
            } else {
                console.error('Failed to update score!');
            }
        }).catch(error => {
            console.error('Error updating score:', error);
        });

        drawText("Player 2 wins !", 350, 250, 'red');
    }
}