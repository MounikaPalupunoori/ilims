pipeline {
    agent any

    tools { nodejs 'icoreNodejs' }

    environment {
        REG_CRED = credentials('registry-cred') //google cloud docker registry credentials
        KEY_PATH = credentials('build_key_path') //google cloud docker registry credentials
        BITBUCKET = credentials('cred_bb_buildbot') // Bitbucket buildbot credentials with url encoded characters
    }

    stages {
        stage('Notify Build Event') {
            steps {
                slackSend baseUrl: 'https://hooks.slack.com/services/',
                        channel: '#icorev4-pipeline',
                        color: '#F09825', // Orange color
                        message: "BUILD STARTED: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)",
                        teamDomain: 'indx',
                        tokenCredentialId: 'slack_secret'
            }
            post {
                failure {
                    script { failureStage = 'Notify Build Event' }
                }
            }
        }
        stage('Docker Build') {
            steps {
                script { failureStage = "${env.STAGE_NAME }"}
                ansiColor('xterm') {
                    sh "gcloud auth activate-service-account --project=thermal-shuttle-153100 --key-file=${KEY_PATH}"
                    sh "gcloud builds submit --config cloudbuild.yaml --substitutions=COMMIT_SHA=\$(git rev-parse HEAD),_COMMIT_SHA_SHORT=\$(git rev-parse --short HEAD),_CUSTOM_TAG=${env.BUILD_NUMBER},_BUILD_DATE=\$(date -u +'%Y-%m-%dT%H:%M:%SZ') ."
                }
            }
            post {
                failure {
                    script { failureStage = 'Docker Build' }
                }
            }
        }
    }
    post {
        success {
            script {
                mailContent = sh(script: 'git log -1 --pretty=format:"Author: %an %n%nAuthor email: %ae %n%nCommitter name: %cn %n%nCommitter email: %ce %n%nCommit Message: %s %n%nCommit SHA: %H"', returnStdout: true)
                authorName = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true)
                authorEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true)
                committerName = sh(script: 'git log -1 --pretty=format:"%cn"', returnStdout: true)
                committerEmail = sh(script: 'git log -1 --pretty=format:"%ce"', returnStdout: true)
                commitSHA = sh(script: 'git log -1 --pretty=format:"%H"', returnStdout: true)
                commitMessage = sh(script: 'git log -1 --pretty=format:"%s"', returnStdout: true)
                shaShort = sh(script: 'git rev-parse --short HEAD', returnStdout: true)

                emailext(body: "<h2><span style='color: #00ff00;'>Build Success</span></h2><p>The build pipeline was successful.</p><p>&nbsp;</p> <p><strong>Build Info</strong></p><p>Job name: <em>${env.JOB_NAME}</em><br />Build number: <em>${env.BUILD_NUMBER}</em></p><p>&nbsp;</p><p><strong>VCS Info</strong></p><p>Author: <em>${authorName}</em></p><p>Author email: <em>${authorEmail}</em></p><p>Committer name: <em>${committerName}</em></p><p>Committer email: <em>${committerEmail}</em></p><p>Commit Message: <em>${commitMessage}</em></p><p>Commit SHA: <em>${commitSHA}</em><br /><p>Job URL for the console logs: ${env.BUILD_URL}</p><br /><p>Docker Registry:<ul><li><em>gcr.io/thermal-shuttle-153100/icore-v5-ilims:latest</em></li><li><em>gcr.io/thermal-shuttle-153100/icore-v5-ilims:${shaShort}</em></li><li><em>gcr.io/thermal-shuttle-153100/icore-v5-ilims:${env.BUILD_NUMBER}</em></li></ul>",
                    subject: "SUCCESS: ${env.JOB_NAME} - Build # ${env.BUILD_NUMBER}",
                    to: "${committerEmail},${authorEmail},${env.EMAIL_QA},${env.EMAIL_DEVOPS},${env.EMAIL_ADMIN}, mumbai-devteam@indxtechnology.com",
                    attachLog: false)

                slackSend(baseUrl: 'https://hooks.slack.com/services/',
                    channel: '#icorev4-pipeline',
                    color: '#29FD40', // Green Color
                    message: "BUILD SUCCESS: ${env.JOB_NAME} ${env.BUILD_NUMBER}.\n <@${env.SLACK_DEVOPS}>: Check console output logs for the pipeline.(<${env.BUILD_URL}|Open>)\n ${mailContent}\nJob name: ${env.JOB_NAME}\n Build number: ${env.BUILD_NUMBER}",
                    teamDomain: 'indx',
                    tokenCredentialId: 'slack_secret')
            }
        }
        failure {
            script {
                mailContent = sh(script: 'git log -1 --pretty=format:"Author: %an %n%nAuthor email: %ae %n%nCommitter name: %cn %n%nCommitter email: %ce %n%nCommit Message: %s %n%nCommit SHA: %H"', returnStdout: true)
                authorName = sh(script: 'git log -1 --pretty=format:"%an"', returnStdout: true)
                authorEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true)
                committerName = sh(script: 'git log -1 --pretty=format:"%cn"', returnStdout: true)
                committerEmail = sh(script: 'git log -1 --pretty=format:"%ce"', returnStdout: true)
                commitSHA = sh(script: 'git log -1 --pretty=format:"%H"', returnStdout: true)
                commitMessage = sh(script: 'git log -1 --pretty=format:"%s"', returnStdout: true)

                emailext(body: "<h2><span style='color: #ff0000;'>Build Failure</span></h2><p>There  were some issues encountered at stage <em><strong>\"${failureStage}\"</strong></em> while building process.</p><p>&nbsp;</p> <p><strong>Build Info</strong></p><p>Job name: <em>${env.JOB_NAME}</em><br />Build number: <em>${env.BUILD_NUMBER}</em></p><p>&nbsp;</p><p><strong>VCS Info</strong></p><p>Author: <em>${authorName}</em></p><p>Author email: <em>${authorEmail}</em></p><p>Committer name: <em>${committerName}</em></p><p>Committer email: <em>${committerEmail}</em></p><p>Commit Message: <em>${commitMessage}</em></p><p>Commit SHA: <em>${commitSHA}</em><br /><p>Job URL for the console logs: ${env.BUILD_URL}</p>",
                    subject: "FAILED: ${env.JOB_NAME} - Build # ${env.BUILD_NUMBER}",
                    to: "${committerEmail},${authorEmail},${env.EMAIL_QA},${env.EMAIL_DEVOPS},${env.EMAIL_ADMIN}, mumbai-devteam@indxtechnology.com",
                    attachLog: false)

                emailext(body: "<h2><span style='color: #ff0000;'>Build Failure</span></h2><p>Check console output logs as attachment to view the issues.</p>",
                    subject: "FAILED: ${env.JOB_NAME} - Build # ${env.BUILD_NUMBER}",
                    to: "${committerEmail},${authorEmail},${env.EMAIL_QA},${env.EMAIL_DEVOPS},${env.EMAIL_ADMIN}, mumbai-devteam@indxtechnology.com",
                    attachLog: true)

                slackSend(baseUrl: 'https://hooks.slack.com/services/',
                    channel: '#icorev4-pipeline',
                    color: '#ff0000', // Red Color
                    message: "BUILD FAILURE for pipeline ${env.JOB_NAME} at stage *_${failureStage}_*\n ${mailContent}\nJob name: ${env.JOB_NAME}\n Build number: ${env.BUILD_NUMBER}\n (<${env.BUILD_URL}|Open>) \n\n\n\n <@${env.SLACK_DEVOPS}>, <@${env.SLACK_QA}>, <@${env.SLACK_DEV_LEAD}>, <@${env.SLACK_ADMIN}>: Please take appropriate actions.",
                    teamDomain: 'indx',
                    tokenCredentialId: 'slack_secret')
            }
        }
    }
}
